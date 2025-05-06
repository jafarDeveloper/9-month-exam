import { globalError } from "shokhijakhon-error-handler";
import { addTime } from "../middlewares/addTime.js";
import {deleteFileFromCloudinary} from "../middlewares/multer.js"

class ControlController {
  constructor() {
    this.controlPost = async function (req, res) {
      try {
        let { direction, empId, kppId } = req.body;
        let imagePath = req.file?.path;
    
        if (!direction || !empId || !kppId || !imagePath) {
          return res.status(400).json({
            message: "Direction or Image or EmpId or KppId not found",
            status: 400,
          });
        }
    
        let [controlDb, employeDb, kppDb] = await Promise.all([
          req.readFile("controls"),
          req.readFile("employes"),
          req.readFile("kpp"),
        ]);
    
        empId = Number(empId);
        kppId = Number(kppId);
    
        let isEmpExist = employeDb.find((emp) => emp.id === empId);
        let isKppExist = kppDb.find((kpp) => kpp.id === kppId);
    
        if (!isEmpExist || !isKppExist) {
          return res.status(404).json({
            message: "Employee or KPP not found!",
            status: 404,
          });
        }
        const lastControl = [...controlDb]
          .reverse()
          .find((control) => control.empId === empId);
    
        if (lastControl) {
          if (lastControl.direction === direction) {
            return res.status(400).json({
              message: `Employee already ${direction === "in" ? "entered" : "exited"}.`,
              status: 400,
            });
          }
        } else {
          if (direction !== "in") {
            return res.status(400).json({
              message: "First entry must be 'in'.",
              status: 400,
            });
          }
        }
    
        let newControl = {
          id: controlDb.length ? controlDb.at(-1).id + 1 : 1,
          firstname: isEmpExist.firstname,
          time: addTime(),
          direction: direction,
          empId: empId,
          kppId: isKppExist.gateLocation,
          imagePath: imagePath,
        };
    
        controlDb.push(newControl);
        await req.writeFile("controls", controlDb);
    
        return res.status(201).json({
          message: `Control (${direction.toUpperCase()}) successfully created`,
          status: 201,
        });
      } catch (err) {
        return globalError(err, res);
      }
    };
         

    this.controlGet = async function (req, res) {
      try {
        let [controlDb, employeDb] = new Promise.all([
          req.readFile("controls"),
          req.readFile("employes")
        ])
        res
          .status(200)
          .json({
            message: "Control successfuly fetchted !",
            status: 200,
            res: controlDb,
          });
      } catch (err) {
        return globalError(err, res);
      }
    };

    this.controlDelete = async function (req, res) {
      try {
        const { controlId } = req.params;
    
        let controlDb = await req.readFile("controls");
    
        let controlToDelete = controlDb.find(control => control.id === Number(controlId));
    
        if (!controlToDelete) {
          return res.status(404).json({
            message: "Control not found!",
            status: 404,
          });
        }
    
      const imagePath = controlToDelete.imagePath;
      const parts = imagePath.split("/upload/");
      const publicIdWithExtension = parts[1];
      const publicId = publicIdWithExtension.split("/").slice(1).join("/").split(".")[0];

    
        await deleteFileFromCloudinary(publicId);
    
        controlDb = controlDb.filter(control => control.id !== Number(controlId));
        await req.writeFile("controls", controlDb);
    
        return res.status(200).json({
          message: "Control and image successfully deleted!",
          status: 200,
        });
      } catch (err) {
        return globalError(err, res);
      }
    };
    
  }
}

export default new ControlController();
