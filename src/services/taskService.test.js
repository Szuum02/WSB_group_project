import { describe, it, expect, vi } from "vitest";
import {
  getTasks,
  createTask,
  deleteTaskById,
  updateTask,
} from "./taskService";
import { getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";

vi.mock("../firebase", () => ({
  auth: {
    currentUser: {
      uid: "user123",
    },
  },
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  getDocs: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  Timestamp: {
    now: vi.fn(() => "NOW"),
  },
}));

describe("firebaseCalls", () => {
  it("returns tasks from firestore", async () => {
    getDocs.mockResolvedValue({
      forEach: (callback) => {
        callback({
          id: "1",
          data: () => ({
            title: "Test task",
            completed: false,
          }),
        });
      },
    });

    const result = await getTasks();

    expect(result).toEqual([
      {
        id: "1",
        title: "Test task",
        completed: false,
      },
    ]);
  });

  it("creates task with userId", async () => {
    addDoc.mockResolvedValue({
      id: "abc123",
    });

    const result = await createTask({
      title: "New task",
      description: "Test",
    });

    expect(result).toMatchObject({
      id: "abc123",
      title: "New task",
      description: "Test",
      userId: "user123",
      completed: false,
    });
  });

  it("deletes task", async () => {
    deleteDoc.mockResolvedValue();

    const result = await deleteTaskById("task1");

    expect(deleteDoc).toHaveBeenCalled();
    expect(result).toEqual({
      success: true,
    });
  });

  it("updates task", async () => {
    updateDoc.mockResolvedValue();

    const task = {
      id: "task1",
      title: "Updated title",
      completed: true,
    };

    const result = await updateTask(task);

    expect(updateDoc).toHaveBeenCalled();
    expect(result).toEqual(task);
  });
});
