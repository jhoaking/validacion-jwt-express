import z from 'zod';

export const validacionEsquema = z.object({
    nombre : z.string().optional(),
    email : z.string().email(),
    password : z.string().min(6)
})


export const validarServicio = (input) =>{
    return validacionEsquema.safeParse(input);
}