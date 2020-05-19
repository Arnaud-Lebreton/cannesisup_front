<?php


class Times
{
	private $id;
	private $times;

	public function __construct()
	{
		$this->id = intval($this->id);
		$this->times;
	}

	/**
	 * @return int
	 */
	public function getId(): int
	{
		return $this->id;
	}

	/**
	 * @return mixed
	 */
	public function getTimes()
	{
		return $this->times;
	}
}