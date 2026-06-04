import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import TaskModal from "./TaskModal";

describe("TaskModal", () => {
  it("Call onSave after creating task", () => {
    const onSave = vi.fn();

    render(
      <TaskModal isOpen={true} onClose={vi.fn()} onSave={onSave} task={null} />,
    );

    fireEvent.change(screen.getByPlaceholderText("Tytuł"), {
      target: {
        value: "Nowe zadanie",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Opis"), {
      target: {
        value: "Opis zadania",
      },
    });

    fireEvent.change(screen.getByDisplayValue(""), {
      target: {
        value: "2026-06-30",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /zapisz/i,
      }),
    );

    expect(onSave).toHaveBeenCalled();
  });
});
