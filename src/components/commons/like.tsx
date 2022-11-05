import React from "react";

interface LikeProps {
  liked: boolean;
  onClick: () => void;
}

const Like = (props : LikeProps)  => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
