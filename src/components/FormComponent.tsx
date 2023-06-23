'use client'
import React, { useState, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import './FormComponent.css';

interface EvaluationFormProps {
  factors: { [key: string]: string[] };
  yesValue: number;
  inPartValue?: number;
  formType: number;
}

interface RadioInputProps {
  name: string;
  label: string;
  value: number;
  selectedValue: number;
  onChange: (val: number) => void;
}
const renderWithLineBreaks = (text: string) => {
  return text.split('<br>').map((line, index, arr) => (
    <React.Fragment key={index}>
      {line}
      {index !== arr.length - 1 && <br />}
    </React.Fragment>
  ));
}

const RadioInput: React.FC<RadioInputProps> = ({ name, label, value, selectedValue, onChange }) => {
  return (
    <Form.Check
      className = "btn-default"
      inline
      type="radio"
      label={label}
      name={name}
      value={value}
      checked={selectedValue === value}
      onChange={() => onChange(value)}
    />
  );
};

const EvaluationForm: React.FC<EvaluationFormProps> = ({ factors, yesValue, inPartValue, formType }) => {
  const partValue = inPartValue || 0;
  const [values, setValues] = useState<{ [key: string]: number }>({});

  const handleInputChange = (name: string, value: number) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const { factorValues, totalMaxGrade, totalGrade } = useMemo(() => {
    const factorValues = Object.keys(factors).map((factor) => {
      const maxScore = factors[factor].length * yesValue;
      const totalScore = factors[factor].reduce((acc, subFactor) => acc + (values[subFactor] || 0), 0);
      return { factor, maxScore, totalScore };
    });

    const totalMaxGrade = factorValues.reduce((acc, fValue) => acc + fValue.maxScore, 0);
    const totalGrade = factorValues.reduce((acc, fValue) => acc + fValue.totalScore, 0);

    return { factorValues, totalMaxGrade, totalGrade };
  }, [factors, yesValue, values]);
  const yesLabel = `Sim (${yesValue})`;
  const partLabel = `Em parte (${partValue})`;
  return (
    <div className="form-component">
      <Table className="evaluation-table">
        <thead>
          <tr>
            <th>Fator de avaliação</th>
            <th>Indicadores de Desempenho</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(factors).map(factor => (
            
            <React.Fragment key={factor}>
              {factors[factor].map((subFactor, i) => (
                <tr key={subFactor}>
                  {i === 0 && <td rowSpan={factors[factor].length}>{factor}</td>}
                  <td>{renderWithLineBreaks(subFactor)}</td>
                  <td className="">
                    <Form>
                      <RadioInput
                        name={subFactor}
                        label={yesLabel}
                        value={yesValue}
                        selectedValue={values[subFactor] || 0}
                        onChange={val => handleInputChange(subFactor, val)}
                      />
                      {formType === 1 && (<RadioInput
                        name={subFactor}
                        label={partLabel}
                        value={partValue}
                        selectedValue={values[subFactor] || 0}
                        onChange={val => handleInputChange(subFactor, val)}
                      />)}
    
                      <RadioInput
                        name={subFactor}
                        label="Não (0.0)"
                        value={0}
                        selectedValue={values[subFactor] || 0}
                        onChange={val => handleInputChange(subFactor, val)}
                      />
                    </Form>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
          {factorValues.map(({ factor, maxScore, totalScore }) => (
            <tr key={factor} >
              <td>Total do {factor}</td>
              <td>Valor máximo: {maxScore}</td>
              <td>Valor obtido: {totalScore.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}><strong>Valor total:</strong></td>
            <td>{totalGrade.toFixed(2)} / {totalMaxGrade}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default EvaluationForm;
