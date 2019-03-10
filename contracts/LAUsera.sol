pragma solidity ^0.4.17;
contract LAUsera{


    mapping(string => userMsg) public User;

    struct userMsg{
	    uint8 age;
        uint8 height;
	    uint8 weight;
	    uint8 rate;
	    string absolutePath;
        TransData[] transData;
    }

    function getTransaction(string userName,uint n) returns(bool,string,uint,bool,uint){
        return User[userName].transData[n].getData();
    }

	function addUser(string _userName,uint8 _age,uint8 _height,uint8 _weight,uint8 _rate,string _absolutePath) public {

        userMsg tmpUser;
		tmpUser.age = _age;
        tmpUser.height = _height;
		tmpUser.weight = _weight;
		tmpUser.rate = _rate;
		tmpUser.absolutePath =_absolutePath;
		User[_userName] = tmpUser;
	}

	function getInfo(string userName)public returns (uint8,uint8,uint8,uint8,string)
	{
	    return (User[userName].age,User[userName].height,User[userName].weight,User[userName].rate,User[userName].absolutePath);
	}

	function addTransRecord(string userName,bool _userRole,string _dealDate,uint _action,bool _transaction,uint _dealAmount)
	{
	    TransData transaction = new TransData(_userRole,_dealDate,_action,_transaction,_dealAmount);
	    User[userName].transData[User[userName].transData.length]=transaction;
	}

}

contract TransData{

    bool public userRole;
    string public dealDate;
    uint public action;//0.用户提交数据 1.
    bool transaction; // 增减
    uint public dealAmount;

	function TransData(bool _userRole,string _dealDate,uint _action,bool _transaction,uint _dealAmount)
	{
	        //添加交易信息
			userRole = _userRole;
			dealDate = _dealDate;
			action = _action;
			transaction = _transaction;
			dealAmount = _dealAmount;

	}


    function getData() returns(bool,string,uint,bool,uint){
        return(userRole,dealDate,action,transaction,dealAmount);
    }
}
