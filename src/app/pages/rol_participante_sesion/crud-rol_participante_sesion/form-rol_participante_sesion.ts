
export let FORM_ROL_PARTICIPANTE_SESION = {
    titulo: 'RolParticipanteSesion',
    tipo_formulario: 'mini',
    btn: 'Guardar',
    alertas: true,
    modelo: 'RolParticipanteSesion',
    campos: [
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'Id',
        label: 'Id*:',
        placeholder: 'Ej. Id',
        requerido: true,
        tipo: 'number',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'Nombre',
        label: 'Nombre*:',
        placeholder: 'Ej. Nombre',
        requerido: true,
        tipo: 'text',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'Descripcion',
        label: 'Descripcion*:',
        placeholder: 'Ej. Descripcion',
        requerido: true,
        tipo: 'text',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'CodigoAbreviacion',
        label: 'CodigoAbreviacion*:',
        placeholder: 'Ej. CodigoAbreviacion',
        requerido: true,
        tipo: 'text',
    },
    {
        etiqueta: 'checkbox',
        claseGrid: 'col-6',
        nombre: 'Activo',
        label: 'Activo*:',
        placeholder: 'Ej. Activo',
        requerido: true,
        tipo: 'checkbox',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'NumeroOrden',
        label: 'NumeroOrden*:',
        placeholder: 'Ej. NumeroOrden',
        requerido: true,
        tipo: 'number',
    },
    ],
}
