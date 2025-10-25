const BASE_URL = "http://localhost:8080";

// -------OBTENER TODOS LOS TICKETS QUE NO TENGAN ESTADO RESUELTO O CERRADO-------
export const obtenerTodosLosTickets = async (token, id_usuario) => {
    const respuesta = await fetch(`${BASE_URL}/ticket?id_usuario=${id_usuario}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener los tickets');
    }
    return await respuesta.json();
}
// -------OBTENER TODOS LOS TICKETS QUE  TENGAN ESTADO RESUELTO O CERRADO-------

export const obtenerTicketsResueltos = async (token) => {
    const respuesta = await fetch(`${BASE_URL}/ticket/resueltos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener los tickets resueltos')
    }
    return await respuesta.json();
}

// -------OBTENER UN TICKET POR ID -------
export const obtenerUnTicket = async (token, id) => {
    const respuesta = await fetch(`${BASE_URL}/ticket/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (!respuesta.ok) {
        throw new Error('Error al obtener el ticket');
    }
    return await respuesta.json();
}

//--------OBTENER TODOS LOS GRUPOS QUE HAY -------
export const obtenerTodosGrupos = async (token) => {
    const respuesta = await fetch(`${BASE_URL}/grupo/nombres`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!respuesta.ok) {
        throw new Error('Error al obtener los grupos');
    }
    return await respuesta.json();
}

// ------ EDITAR UN TICKET ------
export const editarTicket = async (token, id, datosTicket) => {
    const respuesta = await fetch(`${BASE_URL}/ticket/editar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosTicket)
    });
    if (!respuesta.ok) {
        throw new Error('Error al editar el ticket');
    }
    return await respuesta.json();
}

// ------ OBTENER TODOS LOS TICKET DE UN GRUPO ACTIVOS(SIN RESOLVER) ------
export const obtenerTicketPorGrupo = async (token, id) => {
    const respuesta = await fetch(`${BASE_URL}/ticket/grupo/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener los tickets por grupo')
    }

    return await respuesta.json();
}

// ------ OBTENER TODOS LOS TICKET DE UN GRUPO RESUELTOS O CERRADOS ------

export const obtenerTicketsPorGrupoResueltos = async (token, id) => {
    const respuesta = await fetch(`${BASE_URL}/ticket/grupo/resuelto/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!respuesta.ok) {
        throw new Error('Error al obtener los tickets por grupo')
    }

    return await respuesta.json();
}

// ------ ASIGNAR UN RESPONSABLE AL TICKET PARA QUE LO PUEDA VISUALIZAR EN SU WORKSPACE Y TRABAJAR CON EL  ------

export const asignarTicket = async (token, id_ticket, id_usuario) => {
    const respuesta = await fetch(`${BASE_URL}/ticket/asignar/${id_ticket}?id_usuario=${id_usuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!respuesta.ok) {
        throw new Error('Error al asignar el ticket');
    }

    return await respuesta.json();
};

// ------ DESASIGNAR PARA SACARLO DEL WORKSPACE Y QUE OTROS AGENTES PUEDAN TRABAJAR CON EL  ------
export const desasignarTicket = async (token, id_ticket) => {
    const respuesta = await fetch(`${BASE_URL}/ticket/desasignar/${id_ticket}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!respuesta.ok) {
        throw new Error('Error al desasignar el ticket');
    }

    return await respuesta.json();
};

// ------ OBTENER TODOS LOS TICKETS ASIGNADOS A UN AGENTE PARA PODER VERLOS EN SU WORKSPACE  ------
export const obtenerTicketsAsignados = async (token, id_usuario) => {
    const respuesta = await fetch(`${BASE_URL}/ticket/workspace?id_usuario=${id_usuario}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!respuesta.ok) {
        throw new Error('Error al obtener tickets asignados');
    }

    return await respuesta.json();
};

// ------ LIBERAR LOS TICKEST PARA QUE AL LOGEAR NO QUEDEN ASIGNADOS A UN AGENTE SINO QUE LOS PUEDA VOLVER A VER CUALQUIER AGENTE  ------

export const liberarTickets = async (token, id_usuario) => {
    const respuesta = await fetch(`${BASE_URL}/ticket/liberar?id_usuario=${id_usuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!respuesta.ok) {
        throw new Error("Error al liberar tickets");
    }

    return await respuesta.text();
};

// ------ DROPEAR TICKET ------

export const dropearTicket = async (token, id_ticket) => {
  const respuesta = await fetch(`${BASE_URL}/ticket/dropear?id_ticket=${id_ticket}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!respuesta.ok) {
    throw new Error("Error al dropear el ticket");
  }

  return await respuesta.text(); 
};



