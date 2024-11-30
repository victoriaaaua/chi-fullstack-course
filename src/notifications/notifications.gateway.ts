import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

import { Server, Socket } from 'socket.io';
import { NewPostDto } from "./dto/newpost.dto";
@WebSocketGateway({
    namespace: '/notifications',
    cors: {
        origin: '*'
    }
})
export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        console.log('WebSocket initialized');
    }

    handleConnection(client: Socket) {
        console.log('Client connected: ', client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected: ', client.id);
    }



    @SubscribeMessage('newPost')
    handleNewPost(@MessageBody() data: NewPostDto) {
        try {
            this.server.emit('newPost', data);
        } catch (error) {
            console.error('Error emitting newPost event:', error);
        }
    }
}