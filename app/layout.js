const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

import "./globals.css";
import { Poppins } from "next/font/google";
export const metadata = {
				title: "Api",
        description: "Consumo de api gratís",
			};
			export default function RootLayout({ children }) {
        return (
          <html>
						<body>{children}</body>
					</html>
);
}