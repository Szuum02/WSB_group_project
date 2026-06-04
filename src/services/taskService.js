import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

export const getTasks = async () => {
  try {
    const { auth, db } = await import("../firebase");
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return tasks;
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const { auth, db } = await import("../firebase");
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const newTask = {
      ...taskData,
      userId: user.uid,
      createdAt: Timestamp.now(),
      completed: false,
    };

    const docRef = await addDoc(collection(db, "tasks"), newTask);

    return {
      id: docRef.id,
      ...newTask,
    };
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const deleteTaskById = async (id) => {
  try {
    const { db } = await import("../firebase");
    await deleteDoc(doc(db, "tasks", id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const updateTask = async (task) => {
  try {
    const { id, ...updateData } = task;
    const { db } = await import("../firebase");
    await updateDoc(doc(db, "tasks", id), updateData);
    return task;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  return {
    id: 1,
    firstName: "Jan",
    lastName: "Nowak",
    email,
  };
};

export const registerUser = async (userData) => {
  return {
    success: true,
  };
};
