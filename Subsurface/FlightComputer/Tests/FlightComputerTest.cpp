#define CATCH_CONFIG_MAIN
#include "catch.hpp"

TEST_CASE("This is a test unit test") 
{
    SECTION("This is a test section")
    {
        REQUIRE(true == true);
    }
}
