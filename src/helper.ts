import prisma from "./config/db.config";
import { consumer, producer } from "./config/kafka.config";

export const produceMessage = async (topic: string, message: any) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

export const consumeMessages = async (topic: string) => {
  try {
    await consumer.connect();
    console.log(`Connected to Kafka`);

    await consumer.subscribe({ topic, fromBeginning: false });
    console.log(`Subscribed to topic: ${topic}`);

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const data = JSON.parse(message.value!.toString());

          console.log(`Received message from ${topic}:`, {
            partition,
            offset: message.offset,
            value: data,
          });

          if (!data.group_id || !data.name) {
            console.warn(`Invalid message format:`, data);
            return;
          }

          await prisma.chats.create({
            data: {
              group_id: data.group_id,
              message: data.message || null,
              name: data.name,
              file: data.file || null,
            },
          });

          console.log(`Message stored in database`);
        } catch (error) {
          console.error(`Error processing message:`, error);
        }
      },
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      console.log("Disconnecting Kafka Consumer...");
      await consumer.disconnect();
      await prisma.$disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error(`Kafka Consumer Error:`, error);
    process.exit(1);
  }
};
