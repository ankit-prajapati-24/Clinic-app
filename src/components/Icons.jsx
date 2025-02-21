// here I have used https://react-svgr.com/playground/ to convert svg to react component
// Here are all the svg Icons that I hae used in this project as a react component

export const ClinicIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 256 256"
      {...props}
    >
      <path fill="rgba(255, 255, 255, 0)" d="M0 0h256v256H0z" />
      <path
        fill="currentColor"
        d="M71.68 97.22 34.74 128l36.94 30.78a12 12 0 1 1-15.36 18.44l-48-40a12 12 0 0 1 0-18.44l48-40a12 12 0 0 1 15.36 18.44Zm176 21.56-48-40a12 12 0 1 0-15.36 18.44L221.26 128l-36.94 30.78a12 12 0 1 0 15.36 18.44l48-40a12 12 0 0 0 0-18.44ZM164.1 28.72a12 12 0 0 0-15.38 7.18l-64 176a12 12 0 0 0 7.18 15.37 11.79 11.79 0 0 0 4.1.73 12 12 0 0 0 11.28-7.9l64-176a12 12 0 0 0-7.18-15.38Z"
      />
    </svg>
  );
  export const QuickPayIcon = ({ width = "100%", height = "100%", color = "currentColor", ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 300 100"
      {...props}
    >
      {/* Background Rectangular Shape */}
      <rect x="0" y="0" width="300" height="100" fill="none" />
      
      {/* QuickPay Text */}
      <text
        x="30"
        y="60"
        fontFamily="Arial, sans-serif"
        fontSize="40"
        fontWeight="bold"
        fill={color}
      >
        QuickPay
      </text>
  
      {/* Arrow or Payment Symbol */}
      <path
        d="M240 50 L270 30 L270 70 Z"  // Simple arrow shape pointing to the right
        fill={color}
      />
    </svg>
  );
  
  
  export const HamburgetMenuClose = (props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
  );
//   HamburgetMenuOpen
  
  export const HamburgetMenuOpen = (props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
  );