import React, { useState } from "react";
import "./App.css";
import { Input } from "./components/Input/Input";
import { Card } from "./components/Card/Card";
import { useForm } from "react-hook-form";

const App = () => {
  const { control } = useForm({
    mode: "onBlur",
  });
  return (
    <div className="App">
      <Card title={"test Card"}>
        <Input name="test" label="Test Input" control={control} />
      </Card>
    </div>
  );
};

export default App;
