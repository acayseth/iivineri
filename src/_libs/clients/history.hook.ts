export function LocalStorage() {
  
  const getLastHistory = (id: string) => {
  
  };
  
  const setLastHistory = (id: string) => {
    const histories = JSON.parse(localStorage.getItem('histories') as string || '[]');
    histories.push(id);
    localStorage.setItem('histories', JSON.stringify(histories))
  };
  
  return {
    setLastHistory, getLastHistory,
  };
}
