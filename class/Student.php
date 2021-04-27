<?php
include("DBConnection.php");


class Student 
{
  private $db;
  public $_id;
  public $_name;
  public $_surname;
  public $_sidiCode;
  public $_taxCode;

  public function __construct() {
    $this->db = new DBConnection();
    $this->db = $this->db->returnConnection();
  }

  public function find($id){
    $sql = "SELECT * FROM student WHERE id=:id";
    $stmt = $this->db->prepare($sql);
    $data = [
      'id' => $id
    ];
    $stmt->execute($data);
    $result = $stmt->fetch(\PDO::FETCH_ASSOC);
    return $result;
  }
  
  public function all(){
    $sql = "SELECT * FROM student";
    $stmt = $this->db->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
    return $result;
  }
  
  public function insert($student){
    $sql="insert into student (name,surname,sidi_code,tax_code) values (:name,:surname,:sidiCode,:taxCode)";
    $stmt = $this->db->prepare($sql);
    $data = [
      'name' => $student->_name,
	  'surname' => $student->_surname,
	  'sidiCode' => $student->_sidiCode,
	  'taxCode' => $student->_taxCode
    ];
    $stmt->execute($data);
  }
  
  
  
   public function update($id, $student){
    $sql = "UPDATE student set name=:name,surname=:surname,sidi_code=:sidiCode,tax_code=:taxCode WHERE id=:id";
    $stmt = $this->db->prepare($sql);
    $data = [
	  'id' => $id,
      'name' => $student->_name,
	  'surname' => $student->_surname,
	  'sidiCode' => $student->_sidiCode,
	  'taxCode' => $student->_taxCode
    ];
    $stmt->execute($data);
  }
  
  
  
  
  public function delete($id){
	$sql="DELETE FROM student_class where id_student=:id";
	$stmt = $this->db->prepare($sql);
	$stmt->bindParam(':id', $id);
	$stmt->execute();
	$sql="DELETE FROM student where id=:id";
	$stmt = $this->db->prepare($sql);
	$stmt->bindParam(':id', $id);
	$stmt->execute();
  }
}
?>
