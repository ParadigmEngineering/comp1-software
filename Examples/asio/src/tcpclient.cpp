#include <array>
#include <functional>
#include <iostream>
#include <asio.hpp>
#include "easylogging++.h"

INITIALIZE_EASYLOGGINGPP

using asio::ip::tcp;

int main(int argc, char* argv[])
{
	try
	{
		if (argc != 2)
		{
			LOG(ERROR) << "Usage: client <host>";
			return 1;
		}
		
		asio::io_context io_context;
		tcp::resolver resolver(io_context);

		tcp::resolver::results_type endpoints =
			resolver.resolve(argv[1], "daytime");

		tcp::socket socket(io_context);
		asio::connect(socket, endpoints);

		while(true)
		{
			std::array<char, 128> buf;
			asio::error_code error;

			size_t len = socket.read_some(asio::buffer(buf), error);
			if (error == asio::error::eof)
				break;
			else if (error)
				throw asio::system_error(error);

			std::cout.write(buf.data(), len);
		}
	}
	catch (std::exception& e)
	{
		LOG(ERROR) << e.what();
	}
	return 0;
}
