"# lamadev-social-clone" 


주스턴트로 redux 대체한 코드 적용해서 프론트까지 마스터 하자


import { create } from 'zustand';


const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,

  loginStart: () =>
    set((state) => ({
      ...state,
      user: null,
      isFetching: true,
      error: false,
    })),

  loginSuccess: (user) =>
    set((state) => ({
      ...state,
      user: user,
      isFetching: false,
      error: false,
    })),

  loginFailure: () =>
    set((state) => ({
      ...state,
      user: null,
      isFetching: false,
      error: true,
    })),

  follow: (otheruserId) =>
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        followings: [...state.user.followings, otheruserId],
      },
    })),

  unfollow: (otheruserId) =>
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        followings: state.user.followings.filter(
          (following) => following !== otheruserId
        ),
      },
    })),
}));


export const AuthProvider = ({ children }) => {
  const { user } = useAuthStore;

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return <>{children}</>;
};