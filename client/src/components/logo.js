import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

export const Logo = styled((props) => {
  const { variant, ...other } = props;

  const color = variant === "light" ? "#C1C4D6" : "#5048E5";

  return (
    <center>
      <img
        style={{
          width: "180px",

          marginBottom: "-80px",
          marginTop: "-40px",
        }}
        src="https://firebasestorage.googleapis.com/v0/b/aim-assist-a3b61.appspot.com/o/Aim%20Assist%20(1).svg?alt=media&token=5df9a1b6-1696-49b3-8db9-eaf9363dc1b6"
        alt="Img"
      />
    </center>
  );
})``;

Logo.defaultProps = {
  variant: "primary",
};

Logo.propTypes = {
  variant: PropTypes.oneOf(["light", "primary"]),
};
