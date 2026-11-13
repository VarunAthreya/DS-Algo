package main

type Foo struct {
	second chan bool
	third  chan bool
}

func NewFoo() *Foo {
	return &Foo{
		second: make(chan bool),
		third:  make(chan bool),
	}
}

func (f *Foo) First(printFirst func()) {
	printFirst()
	f.second <- true
}

func (f *Foo) Second(printSecond func()) {
	<-f.second
	printSecond()
	f.third <- true
}

func (f *Foo) Third(printThird func()) {
	<-f.third
	printThird()
}
