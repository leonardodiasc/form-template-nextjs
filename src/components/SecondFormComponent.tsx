'use client';
import React, { useState, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import './FormComponent.css';

interface Criteria {
  name: string;
  mark: number;
}

interface SubFactor {
  name: string;
  criteria: Criteria[];
}

interface EvaluationFormProps {
  factors: { [key: string]: SubFactor[] };
  totalScores: number[];
}

const CheckboxInput: React.FC<{
  name: string;
  options: Criteria[];
  selectedValues: string[];
  onChange: (name: string, value: string, checked: boolean) => void;
}> = ({ name, options, selectedValues, onChange }) => {
  return (
    <>
      {options.map((option: Criteria, index: number) => (
        <Form.Check 
          key={index}
          type="checkbox"
          id={`${name}-${index}`}
          label={`${option.name} (${option.mark})`}
          checked={selectedValues.includes(option.name)}
          onChange={(e) => onChange(name, option.name, e.target.checked)}
        />
      ))}
    </>
  );
};

const SecondEvaluationForm: React.FC<EvaluationFormProps> = ({ factors, totalScores }) => {
  const [values, setValues] = useState<{ [key: string]: string[] }>({});

  const handleInputChange = (name: string, value: string, checked: boolean) => {
    setValues(prevValues => {
      const prevSelectedValues = prevValues[name] || [];
      if (checked) {
        return { ...prevValues, [name]: [...prevSelectedValues, value] };
      } else {
        return { ...prevValues, [name]: prevSelectedValues.filter(val => val !== value) };
      }
    });
  };

  const { factorValues, totalMaxGrade, totalGrade } = useMemo(() => {
    const factorValues = Object.keys(factors).map((factor, index) => {
      const maxScore = totalScores[index];
      let totalScore = factors[factor].reduce((acc, subFactor) => {
        const selectedCriteriaMarks = values[subFactor.name]?.map(
          selectedValue => subFactor.criteria.find(criterion => criterion.name === selectedValue)?.mark ?? 0
        ) ?? [];
        return acc + selectedCriteriaMarks.reduce((acc, mark) => acc + mark, 0);
      }, 0);

      totalScore = Math.min(totalScore, maxScore);
      return { factor, maxScore, totalScore };
    });

    const totalMaxGrade = factorValues.reduce((acc, fValue) => acc + fValue.maxScore, 0);
    const totalGrade = factorValues.reduce((acc, fValue) => acc + fValue.totalScore, 0);

    return { factorValues, totalMaxGrade, totalGrade };
  }, [factors, values, totalScores]);

  return (
    <div className="form-component">
      <Table className="evaluation-table">
        <thead>
          <tr>
            <th>Fatores de Avaliação</th>
            <th>Indicadores de Desempenho</th>
            <th>Critérios de pontuação</th>
            <th>Valor de Referencia</th>
            <th>Valor Atribuído</th>
          </tr>
        </thead>
        <tbody>
          {factorValues.map(({ factor, maxScore, totalScore }, index) => (
            <React.Fragment key={factor}>
              {factors[factor].map((subFactor, i) => (
                <tr key={subFactor.name}>
                  {i === 0 && <td rowSpan={factors[factor].length}>{factor}</td>}
                  <td>{subFactor.name}</td>
                  <td>
                    <CheckboxInput
                      name={subFactor.name}
                      options={subFactor.criteria}
                      selectedValues={values[subFactor.name] ?? []}
                      onChange={handleInputChange}
                    />
                  </td>
                  {i === 0 && <td rowSpan={factors[factor].length}>{maxScore}</td>}
                  {i === 0 && <td rowSpan={factors[factor].length}>{totalScore.toFixed(2)}</td>}
                </tr>
              ))}
            </React.Fragment>
          ))}
          {factorValues.map(({ factor, maxScore, totalScore }) => (
            <tr key={factor}>
              <td colSpan={3}><strong>Total do {factor}</strong></td>
              <td><strong>Valor máximo:</strong> {maxScore}</td>
              <td><strong>Valor obtido:</strong> {totalScore.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}><strong>Valor total:</strong></td>
            <td><strong>Valor máximo possível:</strong> {totalMaxGrade}</td>
            <td><strong>Valor total obtido:</strong> {totalGrade.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default SecondEvaluationForm;
