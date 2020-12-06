#include <asio.hpp>
#include <functional>

#include "easylogging++.h"
#include "FlightComputer.h"

INITIALIZE_EASYLOGGINGPP

class printer
{
public:
	printer(asio::io_context& io)
		: m_strand(asio::make_strand(io)),
		  m_timer1(io, asio::chrono::seconds(1)),
		  m_timer2(io, asio::chrono::seconds(1)),
		  m_count(0)
	{
		m_timer1.async_wait(asio::bind_executor(m_strand,
							std::bind(&printer::print1, this)));

		m_timer2.async_wait(asio::bind_executor(m_strand,
							std::bind(&printer::print2, this)));
	}
	
	~printer()
	{
		LOG(INFO) << "The final count is " << m_count;
	}

	void print1()
	{
		if (m_count < 10)
		{
			LOG(INFO) << "Timer1: " << m_count++;

			m_timer1.expires_at(m_timer1.expiry() + asio::chrono::seconds(1));

			m_timer1.async_wait(asio::bind_executor(m_strand,
							   std::bind(&printer::print1, this)));
		}
	}

	void print2()
	{
		if (m_count < 10)
		{
			LOG(INFO) << "Timer2: " << m_count++;

			m_timer2.expires_at(m_timer2.expiry() + asio::chrono::seconds(1));

			m_timer2.async_wait(asio::bind_executor(m_strand,
							   std::bind(&printer::print2, this)));
		}
	}
private:
	asio::strand<asio::io_context::executor_type> m_strand;
	asio::steady_timer m_timer1;
	asio::steady_timer m_timer2;
	int m_count;
};

int main(int argc, char* argv[])
{
	asio::io_context io;
	printer p{io};
	asio::thread t(std::bind(static_cast<size_t (asio::io_context::*)()>(&asio::io_context::run), &io));
	io.run();
	t.join();

    return 0;
}
