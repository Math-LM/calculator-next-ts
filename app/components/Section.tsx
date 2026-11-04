"use client";

import React, { useState } from "react";
import Input from "./Input";
import Row from "./Row";
import Button from "./Button";

const Section = () => {
  const [currentValue, setCurrentValue] = useState("0");
  return (
    <section
      aria-label="Calculadora"
      className="bg-[#FFFFFF] w-[50%] min-h-87.5"
    >
      <Input
        className="w-full h-[75px] bg-[#9a9ab2] border-0 text-end px-[30px] box-border text-[24px] text-white font-['Roboto']"
        value={currentValue}
      />
      <Row>
        <Button label="CE" />
        <Button label="C" />
        <Button
          ariaLabel="Apagar"
          label={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
              />
            </svg>
          }
        />
        <Button label="/" />
      </Row>
      <Row>
        <Button label="7" />
        <Button label="8" />
        <Button label="9" />
        <Button label="*" />
      </Row>
      <Row>
        <Button label="4" />
        <Button label="5" />
        <Button label="6" />
        <Button label="-" />
      </Row>
      <Row>
        <Button label="1" />
        <Button label="2" />
        <Button label="3" />
        <Button label="+" />
      </Row>
      <Row>
        <Button label="-+" />
        <Button label="0" />
        <Button label="." />
        <Button label="=" />
      </Row>
    </section>
  );
};

export default Section;
