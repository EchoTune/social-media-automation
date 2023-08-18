#include <cstdlib>
#include <iostream>

using namespace std;

int main()
{
    system("cd src/js && node server.js");
    cout << "http://192.168.0.249:10001";
    return 0;
}
