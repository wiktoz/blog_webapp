import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/app/components/form/Input';
import { InputInterface } from "@/app/interfaces/form";
import { useForm } from 'react-hook-form';

describe('Input Component', () => {
  // Mock funkcji setter
  const mockSetter = jest.fn();
  
  // Mock funkcji useForm
  const mockSetValue = jest.fn();
  const mockRegister = jest.fn();

  const defaultProps: InputInterface = {
    id: "test-input",
    title: "Test Input",
    type: "text",
    value: "",
    autoComplete: "off",
    placeholder: "Enter text",
    errors: {},
    register: mockRegister, // Mock funkcji register
    setter: mockSetter, // Funkcja setter
    setValue: mockSetValue, // Mock funkcji setValue
  };

  test('renders the input component with given props', () => {
    render(<Input {...defaultProps} />);
    
    // Sprawdzenie, czy etykieta (label) jest wyświetlana poprawnie
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
    
    // Sprawdzenie, czy input jest renderowany z odpowiednimi atrybutami
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('autocomplete', 'off');
  });

  test('calls register function with correct id', () => {
    render(<Input {...defaultProps} />);
    
    // Sprawdzenie, czy funkcja register została wywołana z poprawnym id
    expect(mockRegister).toHaveBeenCalledWith('test-input');
  });

  test('updates the value on user input and calls setter', () => {
    render(<Input {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Enter text');
    
    // Symulowanie zmiany wartości w polu input
    fireEvent.input(input, { target: { value: 'new value' } });

    // Sprawdzenie, czy setter został wywołany z poprawną wartością
    expect(mockSetter).toHaveBeenCalledWith('new value');
  });

  test('shows an error message when there is an error', () => {
    const propsWithError = {
      ...defaultProps,
      errors: {
        "test-input": { message: "This field is required" }
      }
    };

    render(<Input {...propsWithError} />);
    
    // Sprawdzenie, czy komunikat o błędzie jest wyświetlany
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveClass('text-red-600');
  });

  test('does not show an error message when there are no errors', () => {
    render(<Input {...defaultProps} />);
    
    // Sprawdzenie, czy komunikat o błędzie nie jest wyświetlany
    const errorMessage = screen.queryByText('This field is required');
    expect(errorMessage).not.toBeInTheDocument();
  });
});