import { useEffect, useState } from "react";

const sword = [
String.raw`
     /\
     ||
     ||
  <|====|>
    || |
    || |
    || |
    || |
 ___||_|___
/__________\
`
];

export default function AsciiSword() {
    return (
        <pre className="ascii-sword">
            {sword}
        </pre>
    );
}
