// Función para obtener los items paginados
module.exports =  (data = [], page = 1, limit = 10) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return data.slice(startIndex, endIndex);
  }