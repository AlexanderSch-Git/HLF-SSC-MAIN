import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Lato", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primBlue: "#1F283E",
                primRed: "#E6596E",
                primGrey: "#FAFAFA",
                primTextBlue: "#090C44",
                primPink: "#E04D84",
                adminDarkBlue: "#162b56",
                adminDarkPurple: "#323a69",
                adminLightBlue: "#20528D",
                adminAquaBlue: "#6ec2de",
                adminLightPurple: "#8655A7",
                adminDarkPink: "#B16392",
                adminLightPink: "#ECA9B6",
                glassFill: "rgba(250, 250, 250, 0.2)", // Glassmorphism fill color
                glassStroke: "rgba(250, 250, 250, 0.3)", // Glassmorphism border color
            },
            backgroundImage: {
                "gradient-radial":
                    "radial-gradient(circle at 102% 19%, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 35%, var(--tw-gradient-to) 100%)",
            },
            borderWidth: {
                3: "3px",
                5: "5px",
            },
            backdropBlur: {
                "4px": "blur(4px)",
            },
        },
    },

    plugins: [
        forms,
        function ({ addComponents }) {
            addComponents({
                ".glassmorphism": {
                    backgroundColor: "rgba(250, 250, 250, 0.2)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    backdropFilter: "blur(10px)",
                    // border 4px
                    border: "2px solid rgba(240, 240, 250, 0.3)",
                    // rounded corners 16px
                    borderRadius: "16px",
                    //box shadow
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 62, 0.37 )",
                },
                ".counteredGlass": {
                    // border 4px
                    border: "2px solid rgba(240, 240, 250, 0.3)",
                    // rounded corners 16px
                    borderRadius: "16px",
                    //box shadow
                    boxShadow: "0 8px 32px 0 rgba( 31, 38, 62, 0.37 )",
                },
            });
        },
    ],
};
