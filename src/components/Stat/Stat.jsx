import { useState, useEffect } from "react";

export default function Stat(props) {
  const [animateValue, setAnimateValue] = useState(false);
  const [animateSubValue, setAnimateSubValue] = useState(false);

  useEffect(() => {
    if (props.value != 0) {
      setAnimateValue(true);
      const timeout = setTimeout(() => setAnimateValue(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [props.value]);

  useEffect(() => {
    if (props.subvalue != 0) {
      setAnimateSubValue(true);
      const timeout = setTimeout(() => setAnimateSubValue(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [props.subvalue]);

  return (
    <>
      <div className={`Stat ${props.right == true ? "StatRight" : "StatLeft"}`}>
        <span className="StatTitle">{props.title}: </span>
        <span className={`StatValue ${animateValue ? "pop" : ""}`}>
          {props.value}
        </span>
        {props.subvalue != null && (
          <div className="StatSub">
            <span className="StatSubTitle">{props.subvaluetitle}: </span>
            <span className={`StatSubValue ${animateSubValue ? "pop" : ""} `}>
              {props.subvalue}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
