import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const store = (set: any) => ({
  theme: "light" as const,
  toggleTheme: () =>
    set((state: ThemeState) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),

  selectedTalukas: [],
  setSelectedTalukas: (taluka: any) => {
    set((state: any) => ({
      selectedTalukas: [taluka, ...state.selectedTalukas],
    }));
  },
  removeSelectedTalukas: (taluka: any) => {
    set((state: any) => ({
      selectedTalukas: state.selectedTalukas.filter(
        (t: any) => t.id !== taluka.id
      ),
    }));
  },
  selectedStates: [],
  setSelectedStates: (stateItem: any) => {
    set((state: any) => ({
      selectedStates: [stateItem, ...state.selectedStates],
    }));
  },
  removeSelectedStates: (stateItem: any) => {
    set((state: any) => ({
      selectedStates: state.selectedStates.filter(
        (s: any) => s.id !== stateItem.id
      ),
    }));
  },

  selectedDistricts: [],
  setSelectedDistricts: (districtItem: any) => {
    set((state: any) => ({
      selectedDistricts: [districtItem, ...state.selectedDistricts],
    }));
  },
  removeSelectedDistricts: (districtItem: any) => {
    set((state: any) => ({
      selectedDistricts: state.selectedDistricts.filter(
        (d: any) => d.id !== districtItem.id
      ),
    }));
  },
  zustProductId: "",
  setZustProductId: (id: string) => {
    set((state: any) => ({
      zustProductId: id,
    }));
  },
});

const useGlobalState = create(
  // devtools(
  //   persist(store, {
  //     name: "store",
  //   })
  // )
  store
);

export default useGlobalState;

// //THIS IS ONLY FOR TESTING PURPOSES WILL BE REPLACED LATER

// import { create } from "zustand";

// import { devtools, persist } from "zustand/middleware";

// const courseStore = (set) => ({
//   courses: [],
//   addCourse: (course) => {
//     set((state) => ({
//       courses: [course, ...state.courses],
//     }));
//   },
//   removeCourse: (courseId) => {
//     set((state) => ({
//       courses: state.courses.filter((c) => c.id !== courseId),
//     }));
//   },
//   toggleCourseStatus: (courseId) => {
//     set((state) => ({
//       courses: state.courses.map((course) =>
//         course.id === courseId
//           ? { ...course, completed: !course.completed }
//           : course
//       ),
//     }));
//   },
// });

// const useCourseStore = create(
//   devtools(
//     persist(courseStore, {
//       name: "courses",
//     })
//   )
// );

// export default useCourseStore;
