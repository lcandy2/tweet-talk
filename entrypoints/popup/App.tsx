import { useState } from "react";
// import reactLogo from "@/assets/react.svg";
// import wxtLogo from "/wxt.svg";
import "./App.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card.tsx";
import { Input } from "@/ui/input.tsx";
import { Textarea } from "@/ui/textarea.tsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tweet Card</CardTitle>
        <CardDescription>输入内容，获得知名人士的点评。</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea placeholder="在这里输入内容..." />
      </CardContent>
    </Card>
  );
}

export default App;
