import { CircleArea } from "../Components/Map/types";

export const areCircleAreasDifferent = (circle1: CircleArea, circle2: CircleArea) => {
  const radiusDiffer = circle1.radius !== circle2.radius;
  const centerDiffer = circle1.center.place_id !== circle2.center.place_id;

  return radiusDiffer || centerDiffer;
}
