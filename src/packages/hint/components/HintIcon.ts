import isFixed from "../../../util/isFixed";
import van, { State } from "../../dom/van";
import {
  fixedHintClassName,
  hideHintClassName,
  hintClassName,
  hintDotClassName,
  hintNoAnimationClassName,
  hintPulseClassName,
} from "../className";
import { HintItem, HintPosition } from "../hintItem";
import { dataStepAttribute } from "../dataAttributes";
import { alignHintPosition } from "../position";

const { a, div } = van.tags;

export type HintProps = {
  index: number;
  hintItem: HintItem;
  refreshesSignal: State<number>;
  onClick: (e: any) => void;
};

const className = (hintItem: HintItem) => {
  const classNames = [hintClassName];

  if (!hintItem.hintAnimation) {
    classNames.push(hintNoAnimationClassName);
  }

  if (isFixed(hintItem.element as HTMLElement)) {
    classNames.push(fixedHintClassName);
  }

  if (!hintItem.isActive?.val) {
    classNames.push(hideHintClassName);
  }

  return classNames.join(" ");
};

const HintDot = () => div({ className: hintDotClassName });
const HintPulse = () => div({ className: hintPulseClassName });

export const HintIcon = ({
  index,
  hintItem,
  onClick,
  refreshesSignal,
}: HintProps) => {
  const hintElement = a(
    {
      [dataStepAttribute]: index.toString(),
      className: () => className(hintItem),
      role: "button",
      tabindex: 0,
      onclick: onClick,
    },
    HintDot(),
    HintPulse()
  );

  van.derive(() => {
    if (refreshesSignal.val === undefined) return;

    alignHintPosition(
      hintItem.hintPosition as HintPosition,
      hintElement,
      hintItem.element as HTMLElement
    );
  });

  return hintElement;
};
