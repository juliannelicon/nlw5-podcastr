import { createContext, ReactNode, useContext, useState }  from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}
type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeInde] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeInde(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeInde(index);
    setIsPlaying(true);
  }

  function playNext() {
    if(isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeInde(nextRandomEpisodeIndex);

    } else if(hasNext) {
      setCurrentEpisodeInde(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if(hasPrevious) {
      setCurrentEpisodeInde(currentEpisodeIndex - 1);
    }
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider
    value={{
      episodeList,
      currentEpisodeIndex,
      play,
      isPlaying,
      isLooping,
      isShuffling,
      togglePlay,
      toggleLoop,
      toggleShuffle,
      setPlayingState,
      playList,
      playNext,
      playPrevious,
      hasNext,
      hasPrevious
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}