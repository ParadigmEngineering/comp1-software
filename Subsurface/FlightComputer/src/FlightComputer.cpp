#include "FlightComputer.h"
#include "Message.h"
#include "NetClient.h"
#include "test.pb.h"

#include "easylogging++.h"
#include <iostream>
#include <vector>

INITIALIZE_EASYLOGGINGPP

using asio::ip::tcp;
using asio::ip::udp;

int main(int argc, char* argv[])
{
	asio::io_context context;

	udp::resolver resolver(context);
	auto endpoints = resolver.resolve(udp::v4(), "127.0.0.1", "10000");
	UdpClient<Person> client(context, endpoints);

	std::thread t1([&context]() { context.run(); });
	while (true)
	{
		static int count = 0;
		Person person;
		person.set_name("Daniel Burke");
		person.set_email("danielseanburke@gmail.com");

		Message<Person> message(person);
		client.write(message);
		std::cout << client.getReadMessage().body() << std::endl;
		std::this_thread::sleep_for(std::chrono::duration(std::chrono::milliseconds(1000)));
	}

	client.close();
	t1.join();

	return 0;
}
