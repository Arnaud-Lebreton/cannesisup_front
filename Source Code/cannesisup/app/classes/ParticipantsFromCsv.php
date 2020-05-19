<?php

// include 'configDB.php';


//création de la class. touts les variables sont attributs de la class. 
class ParticipantsFromCsv

{
    private $prenom;
    private $nom;
    private $afterwork;
    private $email;
    private $dodo;
    private $entreprise;
    private $lunchPack;
    private $choix1;
    private $choix2;
    private $choix3;
    private $choix4;
    private $choix5;


    //en Java constructeur c'est un function même nom comme la class.
    // Instance de la class. (c'est un version ou le code va être vivant?)
    function __construct(
    $prenom,
	$nom,
	$afterwork,
	$email,
	$dodo,
	$entreprise,
	$lunchPack,
	$choix1,
	$choix2,
	$choix3,
	$choix4,
	$choix5
	)
    {
    	$this->prenom = $prenom;
	    $this->nom = $nom;
	    $this->afterwork = $afterwork;
	    $this->email = $email;
	    $this->dodo = $dodo;
	    $this->entreprise = $entreprise;
	    $this->lunchPack = $lunchPack;
	    $this->choix1 = $choix1;
	    $this->choix2 = $choix2;
	    $this->choix3 = $choix3;
	    $this->choix4 = $choix4;
	    $this->choix5 = $choix5;
    }

	/**
	 * @return mixed
	 */
	public function getPrenom()
	{
		return $this->prenom;
	}

	/**
	 * @param mixed $prenom
	 */
	public function setPrenom($prenom): void
	{
		$this->prenom = $prenom;
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
	 * @return mixed
	 */
	public function getAfterwork()
	{
		return $this->afterwork;
	}

	/**
	 * @param mixed $afterwork
	 */
	public function setAfterwork($afterwork): void
	{
		$this->afterwork = $afterwork;
	}

	/**
	 * @return mixed
	 */
	public function getEmail()
	{
		return $this->email;
	}

	/**
	 * @param mixed $email
	 */
	public function setEmail($email): void
	{
		$this->email = $email;
	}

	/**
	 * @return mixed
	 */
	public function getDodo()
	{
		return $this->dodo;
	}

	/**
	 * @param mixed $dodo
	 */
	public function setDodo($dodo): void
	{
		$this->dodo = $dodo;
	}

	/**
	 * @return mixed
	 */
	public function getEntreprise()
	{
		return $this->entreprise;
	}

	/**
	 * @param mixed $entreprise
	 */
	public function setEntreprise($entreprise): void
	{
		$this->entreprise = $entreprise;
	}

	/**
	 * @return mixed
	 */
	public function getLunchPack()
	{
		return $this->lunchPack;
	}

	/**
	 * @param mixed $lunchPack
	 */
	public function setLunchPack($lunchPack): void
	{
		$this->lunchPack = $lunchPack;
	}

	/**
	 * @return mixed
	 */
	public function getChoix1()
	{
		return $this->choix1;
	}

	/**
	 * @param mixed $choix1
	 */
	public function setChoix1($choix1): void
	{
		$this->choix1 = $choix1;
	}

	/**
	 * @return mixed
	 */
	public function getChoix2()
	{
		return $this->choix2;
	}

	/**
	 * @param mixed $choix2
	 */
	public function setChoix2($choix2): void
	{
		$this->choix2 = $choix2;
	}

	/**
	 * @return mixed
	 */
	public function getChoix3()
	{
		return $this->choix3;
	}

	/**
	 * @param mixed $choix3
	 */
	public function setChoix3($choix3): void
	{
		$this->choix3 = $choix3;
	}

	/**
	 * @return mixed
	 */
	public function getChoix4()
	{
		return $this->choix4;
	}

	/**
	 * @param mixed $choix4
	 */
	public function setChoix4($choix4): void
	{
		$this->choix4 = $choix4;
	}

	/**
	 * @return mixed
	 */
	public function getChoix5()
	{
		return $this->choix5;
	}

	/**
	 * @param mixed $choix5
	 */
	public function setChoix5($choix5): void
	{
		$this->choix5 = $choix5;
	}


}
