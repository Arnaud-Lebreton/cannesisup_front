<?php


class Activites
{
	private $id;
	private $nom;
	private $nbre_max;

	public function __construct()
	{
		$this->id = intval($this->id);
		$this->nom;
		$this->nbre_max = intval($this->nbre_max);
	}

	/**
	 * @return int
	 */
	public function getId(): int
	{
		return $this->id;
	}

	/**
	 * @param int $id
	 */
	public function setId(int $id): void
	{
		$this->id = $id;
	}

	/**
	 * @return mixed
	 */
	public function getNom()
	{
		return $this->nom;
	}

	/**
	 * @param mixed $nom
	 */
	public function setNom($nom): void
	{
		$this->nom = $nom;
	}

	/**
	 * @return int
	 */
	public function getNbreMax(): int
	{
		return $this->nbre_max;
	}

	/**
	 * @param int $nbre_max
	 */
	public function setNbreMax(int $nbre_max): void
	{
		$this->nbre_max = $nbre_max;
	}

}