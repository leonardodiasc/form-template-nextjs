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
}

interface SelectInputProps {
  name: string;
  options: Criteria[];
  selectedValue: string;
  onChange: (val: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ name, options, selectedValue, onChange }) => {
  return (
    <Form.Control as="select" value={selectedValue} onChange={(e) => onChange(e.target.value)}>
      <option value="" disabled selected>Escolha...</option>
      {options.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name} ({option.mark})
        </option>
      ))}
      <option value="none">Nenhuma das opções</option> 
    </Form.Control>
  );
};
const SecondEvaluationForm: React.FC<EvaluationFormProps> = ({ factors }) => {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  
  const handleInputChange = (name: string, value: string) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const { factorValues, totalMaxGrade, totalGrade } = useMemo(() => {
    const factorValues = Object.keys(factors).map((factor) => {
      const maxScore = Math.max(...factors[factor].map(subFactor => Math.max(...subFactor.criteria.map(criterion => criterion.mark))));
      let totalScore = factors[factor].reduce((acc, subFactor) => {
        let selectedCriteriaMark = 0;
        if (values[subFactor.name] !== 'none') {
          const selectedCriteria = subFactor.criteria.find(criterion => criterion.name === values[subFactor.name]);
          selectedCriteriaMark = selectedCriteria ? selectedCriteria.mark : 0;
        }
        return acc + selectedCriteriaMark;
      }, 0);
  
      // Cap the total score to the maximum score
      totalScore = Math.min(totalScore, maxScore);
      return { factor, maxScore, totalScore };
    });
  
    const totalMaxGrade = factorValues.reduce((acc, fValue) => acc + fValue.maxScore, 0);
    const totalGrade = factorValues.reduce((acc, fValue) => acc + fValue.totalScore, 0);
  
    return { factorValues, totalMaxGrade, totalGrade };
  }, [factors, values]);
  

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
          {Object.keys(factors).map(factor => (
            <React.Fragment key={factor}>
            {factors[factor].map((subFactor, i) => {
              const selectedCriteria = subFactor.criteria.find(criterion => criterion.name === values[subFactor.name]);
              return (
                <tr key={subFactor.name}>
                  {i === 0 && <td rowSpan={factors[factor].length}>{factor}</td>}
                  <td>{subFactor.name}</td>
                  <td>
                    <SelectInput
                      name={subFactor.name}
                      options={subFactor.criteria}
                      selectedValue={values[subFactor.name]}
                      onChange={val => handleInputChange(subFactor.name, val)}
                    />
                  </td>
                  <td>{Math.max(...subFactor.criteria.map(criterion => criterion.mark))}</td>
                  <td>{selectedCriteria ? selectedCriteria.mark : '-'}</td>
                </tr>
              );
            })}
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
