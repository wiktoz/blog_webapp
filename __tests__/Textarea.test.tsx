import { render, screen, fireEvent } from '@testing-library/react';
import Textarea from '@/app/components/form/Textarea';
import { UseFormRegister } from 'react-hook-form';
import React from 'react';

interface TextareaInterface {
  id: string;
  title: string;
  description?: string;
  rows?: number;
  value?: string;
  errors?: { [key: string]: { message?: string } };
  register?: UseFormRegister<any>;
  setter?: React.Dispatch<React.SetStateAction<string>>;
}

describe('Textarea Component', () => {
  const mockSetter = jest.fn();
  const mockRegister = jest.fn().mockReturnValue({});
  
  const defaultProps: TextareaInterface = {
    id: 'test-textarea',
    title: 'Test Textarea',
    description: 'Enter text...',
    rows: 3,
    value: '',
    errors: {},
    register: mockRegister,
    setter: mockSetter,
  };

  test('renders the textarea component with given props', () => {
    render(<Textarea {...defaultProps} />);
    
    // Check if the label is rendered correctly
    expect(screen.getByLabelText('Test Textarea')).toBeInTheDocument();
    
    // Check if the textarea is rendered with the correct attributes
    const textarea = screen.getByPlaceholderText('Enter text...');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('rows', '3');
  });

  test('calls register function with correct id', () => {
    render(<Textarea {...defaultProps} />);
    
    // Check if the register function is called with the correct id
    expect(mockRegister).toHaveBeenCalledWith('test-textarea');
  });

  test('updates the value on user input and calls setter', () => {
    render(<Textarea {...defaultProps} />);
    
    const textarea = screen.getByPlaceholderText('Enter text...');
    
    // Simulate changing the value in the textarea
    fireEvent.change(textarea, { target: { value: 'new value' } });

    // Check if the setter is called with the correct value
    expect(mockSetter).toHaveBeenCalledWith('new value');
  });

  test('shows an error message when there is an error', () => {
    const propsWithError = {
      ...defaultProps,
      errors: {
        'test-textarea': { message: 'This field is required' }
      }
    };

    render(<Textarea {...propsWithError} />);
    
    // Check if the error message is displayed
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveClass('text-red-600');
  });

  test('does not show an error message when there are no errors', () => {
    render(<Textarea {...defaultProps} />);
    
    // Check if the error message is not displayed
    const errorMessage = screen.queryByText('This field is required');
    expect(errorMessage).not.toBeInTheDocument();
  });
});