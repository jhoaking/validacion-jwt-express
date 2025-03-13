import z from 'zod';

export const validacionEsquema = z.object({
    nombre : z.string().optional(),
    email : z.string().email(),
    password : z.string().min(6)
})

// validar el zod para el register y login
export const validarServicio = (input) =>{
    return validacionEsquema.safeParse(input);
}