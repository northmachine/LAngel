pragma solidity ^0.4.0;
contract testContract{
    uint height;
    uint weight;
    uint rate;
    function setHeight(uint h) public{
        height=h;
    }
    function setWeight(uint w) public{
        weight=w;
    }
    function setRate(uint r) public{
        rate=r;
    }
    function getHeight() public returns(uint){
        return height;
    }
    function getWeighr() public returns(uint){
        return weight;
    }
    function getRate() public returns(uint){
        return rate;
    }
}
