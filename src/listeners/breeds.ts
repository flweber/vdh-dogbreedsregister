import Express from "express";
import VDH from "../vdh";

const vdh = new VDH();
const router = Express.Router();

router.get("/list", async (req: Express.Request, res: Express.Response) => {
  const refresh = req.query["refresh"] == "true";
  try {
    const breeds = await vdh.getBreeds(refresh);
    res.json(breeds).status(200);
  } catch (err) {
    res.send(err).status(500);
  }
});

export default router;
