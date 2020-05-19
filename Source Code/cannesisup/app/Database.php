<?php

require_once 'classes/Activites.php';
require_once 'classes/Times.php';


class Database
{
	private const DB_NAME = 'cannesisup';
	private const DB_HOST = 'localhost';
	private const DB_USER = 'root';
	private const DB_PASS = '';

	/**
	 * @var Singleton
	 * @access private
	 * @static
	 */
	private static $_instance = null;
	private $PDO = null;

	/**
	 * Constructeur de la classe
	 *
	 * @param void
	 * @return void
	 */
	private function __construct()
	{
		try {
			$this->setPDO();
			Database::$_instance = $this->getPDO();

		} catch (ErrorException $exception) {
			var_dump($exception);
		}
	}

	/**
	 * Méthode qui crée l'unique instance de la classe
	 * si elle n'existe pas encore puis la retourne.
	 *
	 * @param void
	 * @return Database
	 */
	public static function getInstance()
	{

		if (is_null(self::$_instance)) {
			self::$_instance = new Database();
		}

		return self::$_instance;
	}

	/**
	 * @return void
	 */
	private function setPDO() {
		if($this->PDO) {
			return;
		}

		$this->PDO = new PDO('mysql:host=' . self::DB_HOST . ';dbname=' . self::DB_NAME . '', self::DB_USER, self::DB_PASS, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
	}

	/**
	 * @return PDO
	 */
	public function getPDO() {
		return $this->PDO;
	}

	/**
	 * @param $_query requête issue de la classe Queries sous forme de String
	 * @param null $option optionnel, définir à 1 en int pour n'afficher qu'un résultat
	 * @return array
	 */
	public function db_query($_query, $classType = null, $option = null)
	{
		if ($_query === null) {
			return '';
		}
		$results = [];
		if (is_numeric($option)) {
			$_query .= " LIMIT {$option}";
		}
		$query = $this->PDO->query($_query);
		if ($option === 1) {
			if ($classType !== null) {
				$query->setFetchMode(PDO::FETCH_CLASS, $classType);
			} else {
				$query->setFetchMode(PDO::FETCH_OBJ);
			}
			$results = $query->fetch();
		} else  {
			$query = $this->PDO->query($_query);

			if ($classType !== null) {
				$results = $query->fetchAll(PDO::FETCH_CLASS, $classType);
			} else {
				$results = $query->fetchAll(PDO::FETCH_OBJ);
			}
		}
		return $results;
	}

	public function db_execute ($_query) {
		$query = $this->PDO->prepare($_query);
		$query->execute();
	}
}