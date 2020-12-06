#include <ctime>
#include <iostream>
#include <string>
#include <asio.hpp>

using asio::ip::tcp;
using asio::ip::udp;

std::string make_daytime_string()
{
	std::time_t now = std::time(0);
	return std::ctime(&now);
}

class tcp_server;

class tcp_connection
	: public std::enable_shared_from_this<tcp_connection>
{
public:
	typedef std::shared_ptr<tcp_connection> pointer;

	static pointer create(asio::io_context& io_context)
	{
		return pointer(new tcp_connection(io_context));
	}

	tcp::socket& socket()
	{
		return socket_;
	}

	void start()
	{
		message_ = make_daytime_string();

		asio::async_write(socket_, asio::buffer(message_),
			std::bind(&tcp_connection::handle_write, shared_from_this(),
				std::placeholders::_1,
				std::placeholders::_2));
	}

private:
	tcp_connection(asio::io_context& io_context)
		: socket_(io_context)
	{}

	void handle_write(const asio::error_code&, size_t){}

	tcp::socket socket_;
	std::string message_;
};

class tcp_server
{
public:
	tcp_server(asio::io_context& io_context)
		: io_context_(io_context),
		  acceptor_(io_context, tcp::endpoint(tcp::v4(), 13))
	{
		start_accept();
	}

private:
	void start_accept()
	{
		tcp_connection::pointer new_connection =
			tcp_connection::create(io_context_);

		acceptor_.async_accept(new_connection->socket(),
			std::bind(&tcp_server::handle_accept, this, new_connection,
				std::placeholders::_1));
	}
	
	void handle_accept(tcp_connection::pointer new_connection,
		const asio::error_code& error)
	{
		if (!error)
		{
			new_connection->start();
		}

		start_accept();
	}

	asio::io_context& io_context_;
	tcp::acceptor acceptor_;
};

class udp_server
{
public:
	udp_server(asio::io_context& io_context)
		: socket_(io_context, udp::endpoint(udp::v4(), 13))
	{
		start_receive();
	}

private:
	void start_receive()
	{
		socket_.async_receive_from(
			asio::buffer(recv_buffer_), remote_endpoint_,
			std::bind(&udp_server::handle_receive, this,
				std::placeholders::_1,
				std::placeholders::_2));
	}

	void handle_receive(const asio::error_code& error,
		std::size_t)
	{
		if (!error)
		{
			std::shared_ptr<std::string> message(
				new std::string(make_daytime_string()));

			socket_.async_send_to(asio::buffer(*message), remote_endpoint_,
				std::bind(&udp_server::handle_send, this, message,
					std::placeholders::_1,
					std::placeholders::_2));

			start_receive();
		}
	}

	void handle_send(std::shared_ptr<std::string>,
		const asio::error_code&,
		std::size_t)
	{}

	udp::socket socket_;
	udp::endpoint remote_endpoint_;
	std::array<char, 1> recv_buffer_;
};

int main()
{
    try
    {
        asio::io_context io_context;

        tcp_server server1(io_context);

        udp_server server2(io_context);

        io_context.run();
    }
    catch (const std::exception& e)
    {
        std::cerr << e.what() << '\n';
    }

    return 0;
    
}