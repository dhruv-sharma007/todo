const COLORS = {
    info: "\x1b[36m",
    warn: "\x1b[33m",
    error: "\x1b[31m"
  };
  
export  function Logger(level = 'info', ...messages) {
    const timestamp = new Date().toISOString();
    const normalizedLevel = level.toLowerCase();
    const color = COLORS[normalizedLevel] || "";
    const message = messages.join(' ');
    console.log(`${color}[${normalizedLevel.toUpperCase()}] ${timestamp}: ${message}\x1b[0m`);
  }
  