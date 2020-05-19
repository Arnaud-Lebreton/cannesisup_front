<?php


class StringManager
{
	public static function cleaner($string) {
		$string = str_replace("'", "\'", $string);
		$string = str_replace("*", "", $string);
		$string = trim($string);
		return $string;
	}
}