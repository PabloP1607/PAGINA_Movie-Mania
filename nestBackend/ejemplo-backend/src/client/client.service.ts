import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ClientService {
    private clients = [
        {
            id: 1,
            nombre: 'cliente1',
            direccion: 'direccion1'
        },
        {
            id: 2,
            nombre: 'cliente2',
            direccion: 'direccion2'
        }
    ]

    findAll() {
        return this.clients;
    }

    findById(id: number) {
        const client = this.clients.find(c => c.id === id);

        if (!client) {
            throw new NotFoundException(`Client with the id ${id} does not exist`);
        }
        return client;
    }


    deleteClient(id: number) {
        // Encuentra el índice del cliente en el arreglo
        const index = this.clients.findIndex(client => client.id === id);

        // Verifica si el cliente no existe
        if (index === -1) {
            throw new NotFoundException(`Client with the id ${id} does not exist`);
        }

        // Elimina el cliente del arreglo
        this.clients.splice(index, 1);

        return { status: 'cliente eliminado' };
    }

    createClient(clientBody) {
        // Verificar si ya existe un cliente con el mismo ID
        const existingClient = this.clients.find(c => c.id === clientBody.id);

        if (existingClient) {
            throw new NotFoundException(`Client with the id ${clientBody.id} already exists`);
        }

        // Agregar el nuevo cliente al arreglo
        this.clients.push(clientBody);

        return { status: 'cliente creado' };
    }

    updateClient(clientBody, id) {
        // Verificar si el cliente existe
        const existingClient = this.clients.find(c => c.id === id);

        if (!existingClient) {
            throw new NotFoundException(`Client with the id ${id} does not exist`);
        }

        // Actualizar las propiedades del cliente
        existingClient.nombre = clientBody.nombre;
        existingClient.direccion = clientBody.direccion;

        return { status: 'cliente actualizado' };
    }

}
