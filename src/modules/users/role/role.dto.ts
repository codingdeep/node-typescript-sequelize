export interface IRdto {
    id: number;
    name: string;
}

export const toDto = (Role: any) => {
    return {
        id: Role.id,
        name: Role.name
    }
}