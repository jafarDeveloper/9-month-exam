import { ClientError, globalError } from "shokhijakhon-error-handler";
import { addTime } from "../middlewares/addTime.js";

class ControlController {
  constructor() {
    this.controlPost = async function (req, res) {
      try {
        // req.body mavjudligini tekshirish
        if (!req.body) {
          throw new ClientError("Request body is missing", 400);
        }

        let { direction, empId, kppId } = req.body;
        let imagePath = req.file?.path;

        // Validatsiya
        if (!direction || !empId || !kppId || !imagePath) {
          throw new ClientError(
            "Direction, Image, EmpId, or KppId not found",
            400
          );
        }

        // direction faqat "in" yoki "out" bo‘lishi kerak
        if (!["in", "out"].includes(direction.toLowerCase())) {
          throw new ClientError("Direction must be 'in' or 'out'", 400);
        }

        // empId va kppId raqam ekanligini tekshirish
        empId = Number(empId);
        kppId = Number(kppId);
        if (isNaN(empId) || isNaN(kppId)) {
          throw new ClientError("EmpId and KppId must be valid numbers", 400);
        }

        let [controlDb, employeDb, kppDb] = await Promise.all([
          req.readFile("controls"),
          req.readFile("employes"),
          req.readFile("kpp"),
        ]);

        let isEmpExist = employeDb.find((emp) => emp.id === empId);
        let isKppExist = kppDb.find((kpp) => kpp.id === kppId);

        if (!isEmpExist || !isKppExist) {
          throw new ClientError("Employee or KPP not found", 404);
        }

        const lastControl = [...controlDb]
          .reverse()
          .find((control) => control.empId === empId);

        if (lastControl) {
          if (lastControl.direction === direction) {
            throw new ClientError(
              `Employee already ${direction === "in" ? "entered" : "exited"}`,
              400
            );
          }
        } else {
          if (direction !== "in") {
            throw new ClientError("First entry must be 'in'", 400);
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
        let [controlDb, employeDb] = await Promise.all([
          req.readFile("controls"),
          req.readFile("employes"),
        ]);

        res.status(200).json({
          message: "Control successfully fetched!",
          status: 200,
          data: controlDb,
        });
      } catch (err) {
        return globalError(err, res);
      }
    };
  }
}

export default new ControlController();