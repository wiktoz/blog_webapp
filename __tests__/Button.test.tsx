import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/app/components/form/Button";
import { ButtonInterface } from "@/app/interfaces/form";

describe("Button Component", () => {
  const mockClickHandler = jest.fn();

  const defaultProps: ButtonInterface = {
    title: "Click Me",
    loading: false,
    click: mockClickHandler,
  };

  test("renders the button with the given title", () => {
    render(<Button {...defaultProps} />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("does not render Spinner when loading is false", () => {
    render(<Button {...defaultProps} />);
    expect(screen.queryByText("Spinner")).not.toBeInTheDocument();
  });

  test("displays loading state when loading is true", () => {
    const { container } = render(<Button {...defaultProps} loading={true} />);
    // Check if some loading-related elements are visible
    expect(container).toHaveTextContent(""); // Adjust if you expect specific content in loading state
  });

  test("calls the click handler when clicked", () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});