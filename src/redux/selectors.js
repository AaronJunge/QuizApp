
export const getQuizes = state => state.Home.quizes;


export const getQuizById = (state, id) => {
  return state.Home.quizes?.find(i => i.id === id);
};

export const getRecentQuizes = state => state.Home.recentQuizes;


export const getRecentQuizById = (state, id) => {
  return state.Home.recentQuizes?.find(i => i.id === id);
};


export const getRecentlyusedQuiz = state => {
  const quizes = state.Home.recentQuizes;
  const recentlyUsed = quizes.sort((a, b) => a.startedAt - b.startedAt);

  return recentlyUsed;
};
